import Image from "next/image";

const nextImageLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
}

const ContentfulImage = props => {
    console.log('props', props.classes);
    return <Image alt={props.alt} className={props.classes} loader={nextImageLoader} {...props} />
}

export default ContentfulImage;