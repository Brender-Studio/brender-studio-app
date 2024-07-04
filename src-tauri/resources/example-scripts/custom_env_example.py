import bpy
import os

def render_still():
    # Get the active frame from the scene context
    active_frame = bpy.context.scene.frame_current

    # Get the value of the environment variables or assign default values
    output_path = os.environ.get('EFS_BLENDER_OUTPUT_FOLDER_PATH', '/output')
    # Custom environment variable to set the file prefix
    file_prefix = os.environ.get('CUSTOM_RENDER_FILE_PREFIX', 'render')
    
    # Print the values of the environment variables
    print("Output Path:", output_path)
    print("File Prefix:", file_prefix)

    # Set the output path to render according to the render type (still)
    render_file_path = os.path.join(output_path, f"{file_prefix}_{active_frame:05d}.png")
    print("Render File Path:", render_file_path)

    # Ensure the output path directory exists
    os.makedirs(os.path.dirname(render_file_path), exist_ok=True)

    # Set the filepath for rendering
    bpy.context.scene.render.filepath = render_file_path

    # Render the image
    bpy.ops.render.render(write_still=True)
    print(f"Render saved to {render_file_path}")

if __name__ == "__main__":
    render_still()
