import {ImagesPreview} from "../../types/file";
import {getRandomId} from "./random";

type ImagesData = {
    imagesPreviewData: ImagesPreview;
};

export function getImagesData(
    files: FileList | null
): ImagesData | null {
    if (!files || !files.length) return null;

    const hasNonImageFile = Array.from(files).some(({name}) => {
        const extension = name.split('.').pop();
        return extension !== 'png' && extension !== 'jpg';
    });

    if (hasNonImageFile) {
        return null;
    }

    const imagesId = Array.from(files).map(({name}) => {
        const randomId = getRandomId();
        const extension = name.split('.').pop();

        return {
            id: randomId,
            name: (extension === 'png' || extension === 'jpg') ? `${randomId}.${extension}` : null
        };
    });

    const imagesPreviewData = Array.from(files).map((image, index) => ({
        id: imagesId[index].id,
        src: URL.createObjectURL(image),
        alt: imagesId[index].name ?? image.name
    }));


    return {imagesPreviewData};
}
