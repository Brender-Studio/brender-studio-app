import { cpuContainerOptions, gpuContainerOptions } from '@/features/render/job-settings/data/containerOptions';
import { DEFAULT_JOB_SETTINGS } from '@/features/render/job-settings/data/defaultJobSettings';
import { describe, expect, it } from 'vitest';


describe("Job Settings Constants - Ensures consistency between default settings and container options (form cpu & gpu)", () => {
    it("should match CPU container options", () => {
        const cpuSettings = DEFAULT_JOB_SETTINGS.CPU;
        const standardCpuOption = cpuContainerOptions.find(option => option.name === 'Standard');

        expect(standardCpuOption).toBeDefined();
        expect(cpuSettings.vcpus).toBe(standardCpuOption?.vcpus);
        expect(cpuSettings.memory).toBe(standardCpuOption?.memory);
    });

    it("should match GPU container options", () => {
        const gpuSettings = DEFAULT_JOB_SETTINGS.GPU;
        const basicGpuOption = gpuContainerOptions.find(option => option.name === 'Basic');

        expect(basicGpuOption).toBeDefined();
        expect(gpuSettings.vcpus).toBe(basicGpuOption?.vcpus);
        expect(gpuSettings.memory).toBe(basicGpuOption?.memory);
        expect(gpuSettings.number_gpus).toBe(basicGpuOption?.gpus);
    });

    it("should have valid array sizes", () => {
        expect(cpuContainerOptions.some(option => option.vcpus === DEFAULT_JOB_SETTINGS.CPU.array_size)).toBeTruthy();
        expect(gpuContainerOptions.some(option => option.vcpus === DEFAULT_JOB_SETTINGS.GPU.array_size)).toBeTruthy();
    });

    it("should have valid common settings", () => {
        const commonSettings = DEFAULT_JOB_SETTINGS.COMMON;
        expect(commonSettings.timeout).toBe('3600');
        expect(commonSettings.job_attempts).toBe('3');
    });

});