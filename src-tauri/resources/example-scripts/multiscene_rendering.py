import bpy
import os

def render_all_scenes():
    output_path = os.environ.get('EFS_BLENDER_OUTPUT_FOLDER_PATH', '/output')
    for scene in bpy.data.scenes:
        bpy.context.window.scene = scene
        filepath = os.path.join(output_path, f"render_{scene.name}.png")
        bpy.context.scene.render.filepath = filepath
        bpy.ops.render.render(write_still=True)

if __name__ == "__main__":
    render_all_scenes()
