import { useState, useEffect } from "react";
import PopupMenu from "../../../common/popups/PopupMenu";
import ImagePreviewBox from "../../../common/popups/ImagePreviewBox";
import ImagePreview from "../../../common/popups/ImagePreview";

const ImageResultItem = ({ item }) => {
    const [imageSrc, setImageSrc] = useState(item.image?.thumbnailLink);
    const [selectedImage,setSelectedImage]=useState(null)
    const [showPopupMenu, setShowPopupMenu] = useState(false);
    
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const img = new Image();
        img.src = item.link;
        img.onload = () => {
            setImageSrc(item.link);
            setIsLoaded(true);
        };
        img.onerror = () => setError(true);
    }, [item.link]);

    return (
        <div className="break-inside-avoid overflow-hidden rounded-lg hover:shadow-md transition-shadow duration-300">
            <div
                className="block"
            >
                <div className="relative cursor-pointer bg-zinc-100" onClick={()=>setSelectedImage(item)}>
                    {!isLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/10 to-transparent animate-pulse" />
                    )}

                    {!error ? (
                        <img
                            src={imageSrc}
                            alt={item.title}
                            className={`w-full h-auto object-contain transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    ) : (
                        <div className="aspect-video flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                            Image unavailable
                        </div>
                    )}
                </div>
                <a href={item.image?.contextLink}
                    target="_blank"
                    rel="noopener noreferrer" className="p-2 hover:text-orange-500">
                    <h3 className="font-semibold text-sm mb-1 truncate">
                        {item.title}
                    </h3>
                    <p className="text-xs text-gray-500">{item.displayLink}</p>
                </a>
            </div>
            {selectedImage && (
        <PopupMenu onClose={() => setSelectedImage(null)}>
          <ImagePreview
            onClose={() => setSelectedImage(null)}
            item={selectedImage}
          />
        </PopupMenu>)}
        </div>
    );
};

export default ImageResultItem;
