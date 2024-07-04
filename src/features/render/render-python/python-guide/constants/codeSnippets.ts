export const exampleCode = `import bpy
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
    render_multicamera(bpy.context.scene)`;


export const folderStructure = `project_folder/ # Folder containing all files required by the main script
    ├── main_script.py # Main script to be executed
    ├── utils.py 
    └── setup_gpus.py`;

export const pythonPathEnv = `# Configure the PYTHONPATH to include the path to the project directory

def setup_env_python_path(bucket_key):
    efs_project_path = f"/mnt/efs/projects/{bucket_key}"
    print('efs_project_path:', efs_project_path)
                        
    # Set PYTHONPATH to include the project directory and site-packages
    python_site_packages = '/usr/local/lib/python3.10/dist-packages'
    os.environ['PYTHONPATH'] = f"{efs_project_path}:{python_site_packages}:{os.environ.get('PYTHONPATH', '')}"
                        
    # Print the PYTHONPATH
    print("PYTHONPATH:", os.environ['PYTHONPATH'])`


export const exampleArrayJob = `import bpy
import os

# Get the job index from the array
job_index = int(os.environ.get('AWS_BATCH_JOB_ARRAY_INDEX', 0))
output_folder = os.environ.get('BLENDER_OUTPUT_FOLDER_PATH', '/mnt/efs/projects/MyProject/output')

# Set up the scene
scene = bpy.context.scene
scene.frame_start = job_index * 10
scene.frame_end = scene.frame_start + 9
scene.render.filepath = f'{output_folder}/frame_####'

# Render the animation
bpy.ops.render.render(animation=True)`


export const boto3CodeS3 = `import boto3
import bpy
import os

# Get the output path and bucket details from environment variables
output_path = os.environ.get('EFS_BLENDER_OUTPUT_FOLDER_PATH', '/output')
bucket_name = os.environ.get('BUCKET_NAME', 'default-bucket-name')
bucket_key = os.environ.get('BUCKET_KEY', 'default-bucket-key')

# Function to render a still frame and save it to S3
def render_still(active_frame):
    # Set the active frame
    bpy.context.scene.frame_set(active_frame)

    # Set the render file path for the frame
    render_file_path = os.path.join(output_path, f"{active_frame:05d}.png")
    
    # Set the render output path
    bpy.context.scene.render.filepath = render_file_path

    # Render the frame
    bpy.ops.render.render(write_still=True)

    # Upload the render to S3
    s3 = boto3.client('s3')
    s3_upload_path = f"{bucket_key}/test/{active_frame:05d}.png"
    s3.upload_file(render_file_path, bucket_name, s3_upload_path)
    print(f"Render saved to S3 at s3://{bucket_name}/{s3_upload_path}")

# Call the render_still function to render and upload a frame to S3
render_still(10)`;

export const boto3CodeSES = `import boto3

# Create an SES client
ses = boto3.client('ses')

# Send an email
response = ses.send_email(
    Source='your_email@example.com',
    Destination={
        'ToAddresses': ['recipient@example.com'],
    },
    Message={
        'Subject': {
            'Data': 'Test Email',
            'Charset': 'UTF-8'
        },
        'Body': {
            'Text': {
                'Data': 'This is a test email sent using AWS SES and boto3.',
                'Charset': 'UTF-8'
            }
        }
    }
)

print('Email sent! Message ID:', response['MessageId'])`;

export const iamRolePolicy = `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "batch:DescribeJobDefinitions",
                "batch:DescribeJobQueues",
                "batch:DescribeJobs",
                "batch:SubmitJob",
                "batch:TerminateJob",
                "ses:SendTemplatedEmail",
                "ses:SendEmail",
                "ses:SendRawEmail",
                "ses:SendBulkTemplatedEmail"
            ],
            "Resource": "*"
        }
    ]
}`;

export const s3Policy = `{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::bucket-name/*",
                "arn:aws:s3:::bucket-name"
            ]
        }
    ]
}`;