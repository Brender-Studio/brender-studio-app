// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{Manager, Window};
use std::process::Command;
use std::fs::File;
use tar::Builder;
use flate2::Compression;
use flate2::write::GzEncoder;
use tokio::sync::mpsc;
use tokio::task;
use std::path::Path;
use std::fs;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command


#[tauri::command]
fn get_file_size(path: String) -> Result<u64, String> {
    let metadata = fs::metadata(path).map_err(|e| e.to_string())?;
    Ok(metadata.len())
}

#[tauri::command]
fn get_folder_size(path: String) -> Result<u64, String> {
    let path = Path::new(&path);
    let mut total_size = 0;

    for entry in fs::read_dir(path).map_err(|e| e.to_string())? {
        let entry = entry.map_err(|e| e.to_string())?;
        let path = entry.path();
        if path.is_file() {
            total_size += fs::metadata(path).map_err(|e| e.to_string())?.len();
        } else if path.is_dir() {
            total_size += get_folder_size(path.to_str().unwrap().to_string())?;
        }
    }

    Ok(total_size)
}
// Close the splashscreen and show the main window
#[tauri::command]
async fn close_splashscreen(window: Window) {
  // Close splashscreen
  window.get_window("splashscreen").expect("no window labeled 'splashscreen' found").close().unwrap();
  // Show main window
  window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
}


// Run a blender command and return the output scene data
#[tauri::command]
async fn run_blender_command(blender_path: String, blend_file_path: String, script_path: String) -> Result<String, String> {
    // Crear un canal para la comunicación
    let (tx, mut rx) = mpsc::channel(1);

    // Crear una nueva tarea para ejecutar el comando en segundo plano
    task::spawn_blocking(move || {
        let output = Command::new(&blender_path)
            .arg("-b")
            .arg(&blend_file_path)
            .arg("-P")
            .arg(&script_path)
            .output();

        // Enviar el resultado de vuelta a la tarea principal
        let result = match output {
            Ok(output) => {
                if output.status.success() {
                    if let Ok(json_content) = String::from_utf8(output.stdout) {
                        Ok(json_content)
                    } else {
                        Err("Failed to convert stdout to string".to_string())
                    }
                } else {
                    Err(String::from_utf8_lossy(&output.stderr).to_string())
                }
            },
            Err(e) => Err(e.to_string()),
        };

        tx.blocking_send(result).expect("Failed to send result");
    });

    // Esperar el resultado de la tarea en segundo plano
    match rx.recv().await {
        Some(result) => result,
        None => Err("Failed to receive result from background task".to_string()),
    }
}

// Compress a directory into a tar.gz file
#[tauri::command]
fn compress_directory(source_directory: String, output_path: String) -> Result<(), String> {

    let tar_gz = File::create(&output_path).map_err(|e| e.to_string())?;
    let enc = GzEncoder::new(tar_gz, Compression::default());
    let mut tar = Builder::new(enc);
    tar.append_dir_all(".", &source_directory).map_err(|e| e.to_string())?;
    Ok(())
}

fn main() {
    let _ = fix_path_env::fix(); 
    tauri::Builder::default()
        .setup(|_app| {
            #[cfg(debug_assertions)] // only include this code on debug builds
            {
            let window = _app.get_window("main").unwrap();
            window.open_devtools();
            window.close_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![close_splashscreen, run_blender_command, compress_directory, get_file_size, get_folder_size])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
