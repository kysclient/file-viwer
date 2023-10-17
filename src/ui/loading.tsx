import {CustomIcon} from './custom-icon';
import {ReactElement} from "react";

type LoadingProps = {
    className?: string;
    iconClassName?: string;
};

export function Loading({
                            className,
                            iconClassName
                        }: LoadingProps): ReactElement {
    return (
        <i className={`flex justify-center ${className ?? 'p-4'}`}>
            <CustomIcon
                className={`text-main-accent ${iconClassName ?? 'h-7 w-7'}`}
        iconName='SpinnerIcon'
      />
    </i>
  );
}

