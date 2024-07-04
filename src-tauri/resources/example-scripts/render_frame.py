import bpy
import os

# Get the value of the environment variable or assign a default value
output_path = os.environ.get('EFS_BLENDER_OUTPUT_FOLDER_PATH', '/output')

def render_still():
    # Get the active frame from the scene context
    active_frame = bpy.context.scene.frame_current

    print("Valor de output_path:", output_path)

    # Set the output path to render according to the render type (still)
    render_file_path = os.path.join(output_path, f"{active_frame:05d}.png")
    
    print("Valor de render_file_path:", render_file_path)

    # Set the filepath for rendering 
    bpy.context.scene.render.filepath = render_file_path

    # Render the image
    bpy.ops.render.render(write_still=True)
    print(f"Render saved to {render_file_path}")

if __name__ == "__main__":
    # Call the function
    render_still()
