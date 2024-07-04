import { deployConfig } from "@/cli-functions/deploy/deploy-config/deployConfig";
import { formRenderSchema } from "@/schemas/formRenderSchema";
import { z } from "zod";

// debemos crear algo asi:

// {
//     "ses": {
//         "ses_active": true,
//         "render_details": {
//             "project_name": "Project_5",
//             "resolution": "1920x1080",
//             "scene_name": "Scene",
//             "layer_name": "Layer1",
//             "camera_name": "Camera1",
//             "samples": "200",
//             "engine": "CYCLES",
//             "render_type": "Still"
//         },
//         "ses_config": {
//             "region": "us-east-1",
//             "source_email": "rejdev24@gmail.com",
//             "destination_email": "rejdev24@gmail.com",
//             "render_ok_template_name": "RenderCompletedTemplate",
//             "batch_job_2_id": "45557eab-576d-41ff-a2ba-2c357ab5037e"
//         }
//     }
// }

export async function createJob3Command(values: z.infer<typeof formRenderSchema>, currentAwsRegion: string, renderJobId: string, renderType: string, sourceEmail: string, destinationEmail: string) {

    const renderDetails = {
        project_name: values.project_name,
        resolution: `${values.resolution.width}x${values.resolution.height}`,
        scene_name: values.scene_name,
        layer_name: values.layer_name,
        camera_name: values.camera_name,
        samples: values.engine === "CYCLES" && values?.cycles_config?.samples, // changed
        engine: values.engine,
        render_type: renderType,
        active_frame: values.active_frame,
        frame_range: values.frame_range.start + "-" + values.frame_range.end,
        job_array_size: values.job_settings?.array_size || '0'
    }

    const sesConfig = {
        region: currentAwsRegion,
        source_email: sourceEmail,
        destination_email: destinationEmail,
        render_ok_template_name: deployConfig.ses.renderCompletedTemplate,
        // render_ok_template_name: 'RenderCompletedTemplateDemo',
        render_error_template_name: deployConfig.ses.renderFailedTemplate,
        batch_job_2_id: renderJobId
    }

    // "animation_preview_full_resolution": true,
    // "fps": 24,
    // "resolution_x": 1920,
    // "resolution_y": 1080,
    // "output_quality": "HIGH",
    // "encoding_speed": "GOOD",
    // "autosplit": true,
    // "ffmpeg_format": "MPEG4"

    const animationPreview = {
        animation_preview_full_resolution: true,
        fps: values.frame_range.fps,
        resolution_x: values.resolution.width,
        resolution_y: values.resolution.height,
        output_quality: values.ses?.animation_preview?.output_quality,
        encoding_speed: values.ses?.animation_preview?.encoding_speed,
        autosplit: values.ses?.animation_preview?.autosplit,
        ffmpeg_format: values.ses?.animation_preview?.ffmpeg_format
    }

    const sesConfigJson = {
        ses: {
            ses_active: values.ses?.enable_notifications,
            animation_preview: animationPreview,
            render_details: renderDetails,
            ses_config: sesConfig
        }
    }

    return sesConfigJson;
}