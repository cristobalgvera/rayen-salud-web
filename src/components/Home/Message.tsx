import React from "react";

type Props = {
    message: string
};

export const Message = ({message}: Props) => {
    const response: boolean = message !== '';

    return (
        response ?
            <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="mr-auto">Acción</strong>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">
                    {message}
                </div>
            </div>
            :
            <></>
    )
}