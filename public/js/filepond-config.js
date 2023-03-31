document.addEventListener('DOMContentLoaded', () => {
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
        FilePondPluginGetFile,
        FilePondPluginImageOverlay
    )

    FilePond.setOptions({
        stylePanelAspectRatio: 300/200,
        imageResizeTargetWidth: 200,
        imageResizeTargetHeight: 300,
        imagePreviewHeight: 300
    })

    FilePond.parse(document.body)
})
