

type THeading = {
    title: string
    description?: string
}

export const TitleHeading = ({title, description}: THeading) => {
    return (
        <div>
            <h1 className='text-xl font-bold'>{title}</h1>
            <p className='mt-0.5 text-sm text-muted-foreground'>{description}</p>
            {/*// <div className={cn(className)}>*/}
            {/*//     <h1 className={cn('text-xl font-bold', classNameTitle)}>{title}</h1>*/}
            {/*//     <p className={cn('mt-0.5 text-sm text-muted-foreground', classNameDesc)}>{description}</p>*/}
            {/*// </div>*/}
        </div>

    )
}
