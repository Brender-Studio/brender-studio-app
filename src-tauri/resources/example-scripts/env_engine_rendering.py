import bpy
import os

def set_render_engine(scene, use_eevee):
    if use_eevee:
        scene.render.engine = 'BLENDER_EEVEE'
    else:
        scene.render.engine = 'CYCLES'

def render_scene(scene):
    output_path = os.environ.get('EFS_BLENDER_OUTPUT_FOLDER_PATH', '/output')
    filepath = os.path.join(output_path, 'render_output.png')
    bpy.context.scene.render.filepath = filepath
    bpy.ops.render.render(write_still=True)

if __name__ == "__main__":
    use_eevee = os.environ.get('USE_EEVEE', 'False').lower() in ('true', '1')
    set_render_engine(bpy.context.scene, use_eevee)
    render_scene(bpy.context.scene)
