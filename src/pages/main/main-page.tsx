import {useRecoilState} from "recoil";
import {
    deleteResource, Resource,
    resourceArrayState,
    selectedResourceState,
    selectResource
} from "../../utils/atoms/resource-atom";
import {Button} from "../../ui/button";
import {TypedIcon} from "typed-design-system";
import React, {ReactElement, useEffect} from "react";


export default function MainPage() {
    const [resourceArray, setStringArray] = useRecoilState(resourceArrayState);

    const [selectedResource, setSelectedResource] = useRecoilState(selectedResourceState);

    const handleDeleteSelectResource = () => {
        setSelectedResource(selectResource(null));
    };

    const renderData = (): ReactElement => {
        if (isImageURL(selectedResource.src) || selectedResource.src.startsWith('blob:')) {
            return <img src={selectedResource.src} alt={selectedResource.src} className='w-full max-h-[calc(100vh-130px)]' />;
        } else {
            return <iframe src={selectedResource.src} title={selectedResource.src} className='w-full h-full' />;
        }
    }

    function isImageURL(url: string): boolean {
        return /\.(jpg|png)$|blob/i.test(url);
    }


    return (
        <>
            <div className='min-h-screen w-full flex flex-col'>
                <div
                    className='h-[130px] border-b border-light-border dark:border-dark-border flex items-center font-bold text-lg justify-between'>
                    {selectedResource && selectedResource.src}

                    <Button
                        className='hover-animation mr-2 group relative p-2 hover:bg-accent-blue/10 focus-visible:bg-accent-blue/20 focus-visible:!ring-accent-blue/80'
                        onClick={(e) => {
                            e.preventDefault();
                            handleDeleteSelectResource();
                        }}
                    >
                        <TypedIcon
                            icon={'close_19'}
                        />
                    </Button>
                </div>

                <div className='flex justify-center items-center flex-grow'>
                    {
                        !selectedResource ?
                            <>
                                <div
                                    className='flex flex-col space-y-4 text-center my-auto justify-center items-center'>
                                    <TypedIcon
                                        size={150}
                                        icon={'google_drive'}
                                    />
                                    <h1 className='font-bold text-3xl'>리소스를 선택해주세요.</h1>
                                </div>
                            </>
                            :
                            selectedResource.src ?
                                <>
                                {renderData()}
                                </>
                                :
                                <>
                                    <div
                                        className='flex flex-col space-y-4 text-center my-auto justify-center items-center'>
                                        <TypedIcon
                                            size={150}
                                            icon={'templates'}
                                        />
                                        <h1 className='font-bold text-3xl'>리소스를 추가해주세요.</h1>
                                    </div>
                                </>
                    }
                </div>
            </div>
        </>

    )
}
