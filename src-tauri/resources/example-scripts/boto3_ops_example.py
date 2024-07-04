import bpy
import os
import boto3

# Obtener los valores de las variables de entorno o asignar valores por defecto
output_path = os.environ.get('EFS_BLENDER_OUTPUT_FOLDER_PATH', '/output')
bucket_name = os.environ.get('BUCKET_NAME', 'default-bucket-name')
bucket_key = os.environ.get('BUCKET_KEY', 'default-bucket-key')


# Función para renderizar un frame específico en Blender
def render_still(active_frame):
    # Seteamos el frame a renderizar    
    bpy.context.scene.frame_set(active_frame)

    # Seteamos el output path para renderizar según el tipo de render
    render_file_path = os.path.join(output_path, f"{active_frame:05d}.png")
    
    # Seteamos el filepath para el renderizado
    bpy.context.scene.render.filepath = render_file_path

    # Renderizamos la imagen
    bpy.ops.render.render(write_still=True)

    # Guardar el render en S3
    s3 = boto3.client('s3')
    s3_upload_path = f"{bucket_key}/test/{active_frame:05d}.png"
    s3.upload_file(render_file_path, bucket_name, s3_upload_path)
    print(f"Render saved to S3 at s3://{bucket_name}/{s3_upload_path}")

# Llamamos a la función de renderizado con un frame específico
render_still(10)
