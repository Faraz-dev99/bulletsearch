import React, { useContext,useEffect, useState } from 'react';
import { RiFunctionAddLine } from "react-icons/ri";
import PopupMenu from '../../common/popups/PopupMenu';
import QuickLInkForm from '../../common/popups/QuickLinkForm';
import QuickLinkCard from './QuickLinkCard';
import EditQuickLinkForm from '../../common/popups/EditQuickLinkForm';
import { ThemeContext } from '../layout/Layout';

const QuickLInks = () => {
    const {toggleThemeMode,setToggleThemeMode}=useContext(ThemeContext);
    const [showPopupMenu, setShowPopupMenu] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentEditLInk, setCurrentEditLink] = useState({});
    const [links, setLinks] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
    const stored = localStorage.getItem("quick-links");
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                setLinks(parsed);
            }
        } catch (err) {
            console.error("Error parsing localStorage:", err);
        }
    }
    setHasLoaded(true);
}, []);
useEffect(() => {
    if (hasLoaded) {
        localStorage.setItem("quick-links", JSON.stringify(links));
    }
}, [links, hasLoaded]);

    

   const isValidUrl = (url) => {
    try {
        const parsed = new URL(url);

        // Must start with http(s)
        if (!/^https?:\/\//.test(url)) return false;

        // Must have a valid host like domain.com or IP
        if (!parsed.hostname || !parsed.hostname.includes('.')) return false;

        return true;
    } catch {
        return false;
    }
};

    const addQuickLInk = (title, link) => {
        if (!isValidUrl(link)) {
            console.log("Invalid URL");
            setShowPopupMenu(false);
            return;
        }

        const stripped = link.replace(/(^\w+:|^)\/\//, "");
        const favicon = `https://www.faviconextractor.com/favicon/${stripped}?larger=true`;

        const linkobject={
                icon: favicon,
                title: title === "" ? stripped : title,
                link: link, // full URL
            }

        setLinks((prev) => [
            ...prev,
            linkobject,
        ]);

        

        setShowPopupMenu(false);
    };

    const editQuickLink = (id, title, link) => {
        if (!isValidUrl(link)) {
            console.log("Invalid URL");
            setShowEditForm(false);
            return;
        }

        const stripped = link.replace(/(^\w+:|^)\/\//, "");
        const favicon = `https://www.faviconextractor.com/favicon/${stripped}?larger=true`;

        const updatedLink = {
            icon: favicon,
            title: title === "" ? stripped : title,
            link: link, // full URL
        };

        setLinks((prev) => {
            const copy = [...prev];
            copy[id] = updatedLink;
            return copy;
        });

        setShowEditForm(false);
    };

    const deleteQuickLink=(id)=>{
        setLinks((prev)=>{
            return prev.filter((e,index)=>{
                return id!=index&&e;
            })
        })
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full max-w-[900px]">
            {
                links.map((e, i) => (
                    <QuickLinkCard
                        key={i}
                        id={i}
                        title={e.title}
                        link={e.link}
                        icon={e.icon}
                        setCurrentEditLink={setCurrentEditLink}
                        onEditForm={() => setShowEditForm(true)}
                        onDeleteLink={deleteQuickLink}
                    />
                ))
            }

            {
                links.length < 12 && (
                    <div
                        className={`flex justify-center items-center ${toggleThemeMode=="dark"?"bg-gray-900 hover:bg-gray-800":"bg-gray-300 hover:bg-gray-200"}  text-2xl rounded-md p-6 md:p-8 md:text-4xl cursor-pointer `}
                        onClick={() => setShowPopupMenu(true)}
                    >
                        <RiFunctionAddLine />
                    </div>
                )
            }

            {
                showPopupMenu && (
                    <PopupMenu onClose={() => setShowPopupMenu(false)}>
                        <QuickLInkForm
                            onClose={() => setShowPopupMenu(false)}
                            onAddLink={addQuickLInk}
                        />
                    </PopupMenu>
                )
            }

            {
                showEditForm && (
                    <PopupMenu onClose={() => setShowEditForm(false)}>
                        <EditQuickLinkForm
                            onClose={() => setShowEditForm(false)}
                            id={currentEditLInk.id}
                            onEditLink={editQuickLink}
                            title={currentEditLInk.title}
                            link={currentEditLInk.link}
                        />
                    </PopupMenu>
                )
            }
        </div>
    );
};

export default QuickLInks;
