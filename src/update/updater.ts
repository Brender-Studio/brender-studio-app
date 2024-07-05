import { checkUpdate, installUpdate, onUpdaterEvent } from '@tauri-apps/api/updater'
import { relaunch } from '@tauri-apps/api/process'

export async function setupUpdater() {
    const unlisten = await onUpdaterEvent(({ error, status }) => {
        console.log('Updater event', error, status)
    })

    try {
        const { shouldUpdate, manifest } = await checkUpdate()

        if (shouldUpdate) {
            console.log(
                `Installing update ${manifest?.version}, ${manifest?.date}, ${manifest?.body}`
            )

            await installUpdate()
            await relaunch()
        }
    } catch (error) {
        console.error('Error during update check:', error)
    }

    return unlisten
}