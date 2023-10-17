import React, {ChangeEvent, ReactElement, ClipboardEvent, useEffect, useRef, useState} from "react";
import {
    addResource,
    deleteResource, Resource,
    resourceArrayState,
    selectedResourceState,
    selectResource,
    updateResource
} from "../../utils/atoms/resource-atom";
import {useRecoilState} from "recoil";
import {MotionProps, motion, AnimatePresence} from "framer-motion";
import ResourceCard from "../resource-card/resource-card";
import {isValidScheme} from "../../utils/isValidScheme";
import toast from "react-hot-toast";
import {convertToEmbedURL} from "../../utils/convertToEmbedURL";
import {getImagesData} from "../../utils/fileValidation";
import {simulateRandomResourceRegistration} from "../../utils/random";

export function Sidebar(): ReactElement {
    const [resourceArray, setResourceArray] = useRecoilState(resourceArrayState);
    const [selectedResource, setSelectedResource] = useRecoilState(selectedResourceState);
    const inputFileRef = useRef<HTMLInputElement | null>(null);

    const handleAddImageResource = (): void => inputFileRef.current?.click();

    const handleAddResource = async (newResource: string | null) => {
        if (newResource !== '') {
            const isSuccess = await simulateRandomResourceRegistration();
            if (!isSuccess) {
                toast.error('리소스 저장에 실패하였습니다');
                return
            }
        }
        toast.success('리소스가 추가되었습니다.')
        setResourceArray(addResource(newResource));
    };

    const handleUpdateResource = async (index: number, updatedResource: string) => {
        if (!isValidScheme(updatedResource)) {
            toast.error('“https://” 또는 “http://” scheme이 포함되어야합니다');
            return
        }
        const convertedURL = convertToEmbedURL(updatedResource)
        setResourceArray(updateResource(index, convertedURL));

        const newSelectedResource = {
            src: convertedURL,
            key: selectedResource.key
        }
        handleSelectResource(newSelectedResource)
        toast.success('리소스 저장에 성공하였습니다');
    };

    const handleDeleteResource = (index: number) => {
        setResourceArray(deleteResource(index));
    };

    const handleSelectResource = (resource: Resource) => {
        setSelectedResource(selectResource(resource));
    };

    const handleImageUpload = (
        e: ChangeEvent<HTMLInputElement> | ClipboardEvent<HTMLTextAreaElement>
    ): void => {
        const isClipboardEvent = 'clipboardData' in e;

        if (isClipboardEvent) {
            const isPastingText = e.clipboardData.getData('text');
            if (isPastingText) return;
        }

        const files = isClipboardEvent ? e.clipboardData.files : e.target.files;

        const imagesData = getImagesData(files);

        if (!imagesData) {
            toast.error('.png 혹은 .jpg 파일만 업로드 가능합니다.');
            return;
        }

        const {imagesPreviewData} = imagesData;

        imagesPreviewData.forEach(resource => {
            handleAddResource(resource.src)
        })

    };

    return (
        <>
            <header
                id='sidebar'
                className='bg-main-sidebar-background hidden xs:flex transition-opacity duration-200 md:w-[320px] border-r border-light-border dark:border-dark-border flex justify-center'
            >
                <div
                    className='w-full'
                >
                    <section className='flex flex-col justify-center gap-2 xs:items-center xl:items-stretch'>
                        <div className='bg-white w-full'>
                            <h1 className=''>
                                <button
                                    className='custom-button main-tab text-accent-blue transition hover:bg-light-primary/10
                           focus-visible:bg-accent-blue/10 focus-visible:!ring-accent-blue/80
                          dark:hover:bg-dark-primary/10'
                                >
                                    <img className='w-full rounded-full' alt='logo'
                                         src={'https://storage.googleapis.com/typed-assets-bucket-prd/landingpage/logos/fullTypedLogo.svg'}/>
                                </button>
                            </h1>
                            <div
                                className='flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2 w-full p-2 pb-8 shadow-4'>
                                <button
                                    onClick={() => {
                                        handleAddResource('')
                                    }}
                                    className='custom-button rounded-md w-full border px-2.5 py-1  hover:bg-light-primary/10'
                                >
                                    <p className='text-sm'>
                                        URL 추가
                                    </p>
                                </button>
                                <button
                                    onClick={handleAddImageResource}
                                    className='custom-button rounded-md w-full border px-2.5 py-1  hover:bg-light-primary/10'
                                >
                                    <p className='text-sm'>
                                        이미지 추가
                                    </p>
                                </button>

                                <input
                                    className='hidden'
                                    type='file'
                                    accept='image/*'
                                    onChange={handleImageUpload}
                                    ref={inputFileRef}
                                    multiple
                                />
                            </div>
                        </div>

                        <AnimatePresence mode='popLayout'>
                            <div className={'inner:px-4 inner:py-3 h-full max-h-[800px] overflow-y-auto'}>

                                <div
                                    className='flex items-center justify-around xs:flex-col xs:justify-center xl:block p-2 bg-main-sidebar-background space-y-2'>
                                    {
                                        resourceArray.map((resource, idx) => (
                                            <>
                                                <ResourceCard
                                                    resource={resource}
                                                    idx={idx}
                                                    handleUpdateResource={handleUpdateResource}
                                                    handleDeleteResource={handleDeleteResource}
                                                    handleSelectResource={handleSelectResource}
                                                />
                                            </>
                                        ))
                                    }
                                </div>
                            </div>
                        </AnimatePresence>

                    </section>
                </div>
            </header>
        </>
    )
}
