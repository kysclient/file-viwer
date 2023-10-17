export type ImageData = {
    src: string;
    alt: string;
};

export type ImagesPreview = (ImageData & {
    id: string;
})[];

