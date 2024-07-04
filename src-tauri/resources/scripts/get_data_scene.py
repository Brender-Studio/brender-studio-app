import bpy
import json


class SceneInfo:
    def __init__(self, scene):
        self.scene = scene

    def get_frame_range(self):
        frame_end, frame_start, frame_step, fps = (
            self.scene.frame_end,
            self.scene.frame_start,
            self.scene.frame_step,
            self.scene.render.fps / self.scene.render.fps_base,
        )
        return {
            "start": frame_start,
            "end": frame_end,
            "step": frame_step,
            "fps": fps,
            "custom": f"{frame_start}:{frame_end}:{frame_step}",
        }

    def get_node_outputs(self):
        compositor_context = self.scene.node_tree
        node_outputs = []
        if compositor_context:
            for node in compositor_context.nodes:
                if self.is_file_output_node(node):
                    node_outputs.append(
                        {
                            "path": node.base_path,
                            "expected": len(node.file_slots),
                            "name": node.name,
                        }
                    )
        return node_outputs

    def is_file_output_node(self, node):
        return node.bl_idname == "CompositorNodeOutputFile" and node.base_path

    def get_active_layer(self):
        for layer in self.scene.view_layers:
            if layer.use:
                return layer.name
        return None


    def get_engine_config(self):
        if self.scene.render.engine == "CYCLES":
            return {
                "cycles_config": {
                    "denoise_config": self.get_denoise_config(),
                    "light_paths": self.get_light_paths_info(),
                    "samples": self.scene.cycles.samples, 
                }
            }
        elif self.scene.render.engine == "BLENDER_EEVEE":
            return {
                "eevee_config": {
                    # "samples": self.scene.eevee.taa_render_samples 
                    "taa_samples": self.scene.eevee.taa_render_samples ,
                    "shadows": {
                        "cube_size": self.scene.eevee.shadow_cube_size,
                        "cascade_size": self.scene.eevee.shadow_cascade_size,
                        "high_bitdepth": self.scene.eevee.use_shadow_high_bitdepth,
                        "soft_shadows": self.scene.eevee.use_soft_shadows,
                    }
                }
            }
        else:
            return {}


    def to_dict(self):
        engine_config = self.get_engine_config() 

        blender_version_file = bpy.data.version
        
        return {
            "blender_version_file": f"{blender_version_file[0]}.{blender_version_file[1]}.{blender_version_file[2]}",
            "use_stamp": self.scene.render.use_stamp,
            "use_compositor": self.scene.render.use_compositing,
            "use_sequencer": self.scene.render.use_sequencer,
            "use_denoise": (
                self.scene.cycles.use_denoising
                if self.scene.render.engine != "BLENDER_EEVEE"
                else False
            ),
            "scene_name": self.scene.name,
            "layer": {
                "active_layer": self.get_active_layer(),
                "available_layers": [layer.name for layer in self.scene.view_layers],
            },
            "camera": {
                "active": self.scene.camera.name if self.scene.camera else None,
                "available_cameras": [
                    obj.name for obj in self.scene.objects if obj.type == "CAMERA"
                ],
            },
            "resolution": {
                "width": self.scene.render.resolution_x,
                "height": self.scene.render.resolution_y,
                "resolution_percentage": self.scene.render.resolution_percentage,
            },
            "aspect_ratio": {
                "width": self.scene.render.pixel_aspect_x,
                "height": self.scene.render.pixel_aspect_y,
            },
            "active_frame": self.scene.frame_current,
            "frame_range": self.get_frame_range(),
            "engine": self.scene.render.engine,
            "is_active": self.scene == bpy.context.scene,
            "output": {
                "color": {
                    "color_mode": self.scene.render.image_settings.color_mode,
                    "color_depth": self.scene.render.image_settings.color_depth,
                },
                "output_format": self.scene.render.image_settings.file_format,
                "compression": self.scene.render.image_settings.compression
            },
            "node_outputs": self.get_node_outputs(),
            **engine_config
        }
    

    def get_samples(self):
        if self.scene.render.engine == "CYCLES":
            return self.scene.cycles.samples
        else:
            return self.scene.eevee.taa_render_samples

    def get_light_paths_info(self):
        if self.scene.render.engine == "CYCLES":
            return {
                "caustics": {
                    "filter_glossy": self.scene.cycles.blur_glossy,
                    "reflective": self.scene.cycles.caustics_reflective,
                    "refractive": self.scene.cycles.caustics_refractive,
                },
                "clamping": {
                    "direct": self.scene.cycles.sample_clamp_direct,
                    "indirect": self.scene.cycles.sample_clamp_indirect,
                },
                "max_bounces": {
                    "total": self.scene.cycles.max_bounces,
                    "diffuse_bounces": self.scene.cycles.diffuse_bounces,
                    "glossy_bounces": self.scene.cycles.glossy_bounces,
                    "transmission_bounces": self.scene.cycles.transmission_bounces,
                    "volume_bounces": self.scene.cycles.volume_bounces,
                    "transparent_max_bounces": self.scene.cycles.transparent_max_bounces,
                },
            }
        else:
            return {}

    def get_denoise_config(self):
        if self.scene.render.engine == "CYCLES" and self.scene.cycles.use_denoising:
            noise_threshold = self.scene.cycles.adaptive_threshold
            if noise_threshold is not None:
                noise_threshold_float = float(noise_threshold)
                noise_threshold_rounded = round(noise_threshold_float, 2)
            else:
                noise_threshold_rounded = None

            return {
                "algorithm": self.scene.cycles.denoiser,
                "noise_threshold": noise_threshold_rounded,
                "denoise_pass": self.scene.cycles.denoising_input_passes,
                "denoise_prefilter": self.scene.cycles.denoising_prefilter,
            }
        else:
            return {
                "algorithm": 'OPENIMAGEDENOISE',
                "noise_threshold": 0.01,
                "denoise_pass": 'RGB_ALBEDO_NORMAL',
                "denoise_prefilter": 'ACCURATE',
            }


def get_all_scenes_info():
    return [SceneInfo(scene).to_dict() for scene in bpy.data.scenes]


def main():
    scenes_info = get_all_scenes_info()
    json_data = json.dumps(scenes_info, indent=4)
    
    print("##START##", json_data)
    print("##END##")


if __name__ == "__main__":
    main()