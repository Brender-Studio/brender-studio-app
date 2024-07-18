import { Command } from '@tauri-apps/api/shell';

async function listS3Objects(bucket: string, prefix: string, region: string, profile: string) {
    const command = new Command('aws-cli', [
        's3api', 'list-objects-v2',
        '--bucket', bucket,
        '--prefix', prefix,
        '--region', region,
        '--profile', profile,
        '--query', 'Contents[].Key',
        '--output', 'json'
    ]);

    let errorOutput = '';

    command.stderr.on('data', data => {
        errorOutput += data.toString();
    });

    const child = await command.execute();

    if (child.code !== 0) {
        throw new Error(`Command failed with code ${child.code}. Error: ${errorOutput}`);
    }

    const output = child.stdout.toString().trim();
    // console.log('output', output)
    return JSON.parse(output);
}

export async function getPlayblastUrl(bucket: string, profile: string, region: string, path: string) {
    try {
        // List objects in the bucket with the given path
        const objects = await listS3Objects(bucket, path, region, profile);
        // console.log('objects', objects)
        
        // Filter the objects to find the one that starts with 'bs_playblast'
        const playblastObject = objects.find((key: string | string[]) => key.includes('bs_playblast'));
        // console.log('playblastObject', playblastObject)
        
        if (!playblastObject) {
            throw new Error('No playblast object found');
        }

        // Generate a presigned URL for the playblast object
        const command = new Command('aws-cli', [
            's3', 'presign', `s3://${bucket}/${playblastObject}`,
            '--expires-in', '3600',
            '--region', region,
            '--profile', profile
        ]);

        let errorOutput = '';

        command.stderr.on('data', data => {
            errorOutput += data.toString();
        });

        const child = await command.execute();

        if (child.code !== 0) {
            throw new Error(`Command failed with code ${child.code}. Error: ${errorOutput}`);
        }

        const url = child.stdout.toString().trim();

        return url;
    } catch (error) {
        throw new Error(`Error in getPlayblastUrl: ${error}`);
    }
}
