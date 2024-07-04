import bpy
import os

def render_frame_range(scene, start_frame, end_frame):
    output_path = os.environ.get('EFS_BLENDER_OUTPUT_FOLDER_PATH', '/output')
    scene.frame_start = start_frame
    scene.frame_end = end_frame
    for frame in range(start_frame, end_frame + 1):
        scene.frame_set(frame)
        filepath = os.path.join(output_path, f"render_frame_{frame}.png")
        bpy.context.scene.render.filepath = filepath
        bpy.ops.render.render(write_still=True)

if __name__ == "__main__":
    job_index = int(os.environ.get('AWS_BATCH_JOB_ARRAY_INDEX', 0))
    job_size = int(os.environ.get('AWS_BATCH_JOB_ARRAY_SIZE', 1))
    total_frames = bpy.context.scene.frame_end - bpy.context.scene.frame_start + 1
    frames_per_job = total_frames // job_size
    start_frame = bpy.context.scene.frame_start + job_index * frames_per_job
    end_frame = start_frame + frames_per_job - 1

    if job_index == job_size - 1:
        end_frame = bpy.context.scene.frame_end  # Último trabajo se asegura de renderizar hasta el final

    render_frame_range(bpy.context.scene, start_frame, end_frame)
