import React, {ChangeEvent, ReactElement, useEffect, useRef, useState} from "react";
import {Button} from "../../ui/button";
import {TypedIcon} from "typed-design-system";
import TextArea from "react-textarea-autosize";
import {Variants, motion} from "framer-motion";
import { Resource, resourceArrayState, selectedResourceState} from "../../utils/atoms/resource-atom";
import {useRecoilState} from "recoil";

type ResourceCardProps = {
    resource: Resource;
    idx: number;
    handleUpdateResource: (index: number, updateResource: string) => void;
    handleDeleteResource: (index: number) => void;
    handleSelectResource: (resource: Resource) => void;
}

function ResourceCard({
                          resource,
                          idx,
                          handleUpdateResource,
                          handleDeleteResource,
                          handleSelectResource
                      }: ResourceCardProps): ReactElement {

    const [disabled, setDisabled] = useState<boolean>(true);
    const [text, setText] = useState<string>('');
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const [selectedResource, setSelectedResource] = useRecoilState(selectedResourceState);
    const [className, setClassName] = useState('');


    const handleFocus = () => {
        textAreaRef.current?.focus();
    }

    const handleChange = ({
                              target: {value}
                          }: ChangeEvent<HTMLTextAreaElement>): void => setText(value);

    useEffect(() => {
        if (resource) {
            setText(resource.src)
        }
    }, [resource])

    useEffect(() => {
        if (selectedResource && resource.key === selectedResource.key) {
            setClassName('border-r-4 border-main-accent shadow-lg');
        } else {
            setClassName('');
        }
    }, [resource, selectedResource]);


    return (
        <>
            <motion.div
                key={idx + 1}
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: -20}}
                onClick={() => {
                    handleSelectResource(resource);
                }}
            >
                <div
                    className={`${className} hover-animation cursor-pointer accent-tab hover-card relative flex  flex-col gap-0.5 p-5 pb-10 bg-white rounded-lg`}>
                    <div className='absolute right-2 bottom-2'>
                        <div className='flex space-x-1'>
                            <Button
                                className='hover-animation group relative  p-2 hover:bg-accent-blue/10 focus-visible:bg-accent-blue/20 focus-visible:!ring-accent-blue/80'
                                onClick={(e) => {
                                    e.preventDefault();
                                    setDisabled(false);
                                    handleFocus();
                                }}
                            >
                                <TypedIcon
                                    icon={'edit_19'}
                                />
                            </Button>

                            <Button
                                className='hover-animation group relative  p-2 hover:bg-accent-blue/10 focus-visible:bg-accent-blue/20 focus-visible:!ring-accent-blue/80'
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleDeleteResource(idx);
                                }}
                            >
                                <TypedIcon
                                    icon={'trash_19'}
                                />
                            </Button>
                        </div>
                    </div>
                    <TextArea
                        className={`w-full font-bold pb-2 resize-none bg-transparent text-sm outline-none placeholder:font-medium placeholder:text-xs placeholder:text-light-secondary dark:placeholder:text-dark-secondary ${!disabled && 'border-main-accent border-b'}`}
                        value={text}
                        disabled={disabled}
                        placeholder='URL을 작성해주세요'
                        onChange={handleChange}
                        onBlur={() => {
                            handleUpdateResource(idx, text);
                            setDisabled(true);
                        }}
                        autoFocus={true}
                        ref={textAreaRef}
                    />
                </div>
            </motion.div>
        </>
    );
};

export default React.memo(ResourceCard);
