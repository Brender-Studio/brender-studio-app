import bpy
import os

def enable_gpus(device_type='CUDA', use_cpus=False):
    preferences = bpy.context.preferences
    cycles_preferences = preferences.addons["cycles"].preferences
    cycles_preferences.refresh_devices()
    devices = cycles_preferences.devices

    if not devices:
        raise RuntimeError("Unsupported device type")

    activated_gpus = []
    for device in devices:
        if device.type == "CPU":
            device.use = use_cpus
            print('Activated CPU:', device.name)
        else:
            device.use = True
            activated_gpus.append(device.name)
            print('Activated GPU:', device.name)

    cycles_preferences.compute_device_type = device_type

    print("Activated GPUs:", activated_gpus)
    return activated_gpus

def render_basic_scene(output_path):
    # Ensure the output path directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    # Set the file path for the render output
    bpy.context.scene.render.filepath = output_path

    # Perform the render
    bpy.ops.render.render(write_still=True)
    print(f"Render saved to {output_path}")

if __name__ == "__main__":
    # Enable CUDA GPUs and CPUs
    device_type = 'CUDA'
    use_cpus = True

    activated_gpus = enable_gpus(device_type, use_cpus)
    print("Activated GPUs:", activated_gpus)

    # Render a basic scene
    output_folder_path = os.environ.get('EFS_BLENDER_OUTPUT_FOLDER_PATH', '/output')
    render_output_path = os.path.join(output_folder_path, 'render_basic.png')
    render_basic_scene(render_output_path)
