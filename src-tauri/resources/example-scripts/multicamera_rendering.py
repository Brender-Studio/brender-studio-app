import bpy
import os

def render_multicamera(scene):
    output_path = os.environ.get('EFS_BLENDER_OUTPUT_FOLDER_PATH', '/output')
    for obj in scene.objects:
        if obj.type == 'CAMERA':
            scene.camera = obj
            filepath = os.path.join(output_path, f"render_{obj.name}.png")
            bpy.context.scene.render.filepath = filepath
            bpy.ops.render.render(write_still=True)

if __name__ == "__main__":
    render_multicamera(bpy.context.scene)
