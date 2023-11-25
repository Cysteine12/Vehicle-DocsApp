document.addEventListener('DOMContentLoaded', () => {
    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
        FilePondPluginGetFile,
        FilePondPluginImageOverlay
    )

    FilePond.setOptions({
        imageResizeTargetWidth: 200,
        imageResizeTargetHeight: 300,
        imagePreviewMaxHeight: 1000,
        allowMultiple: true,
        maxFiles: 3
    })

    FilePond.parse(document.body)
})
