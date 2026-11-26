import React, { useRef } from "react"
import classNames from "classnames"

import { iTab, iTabsHeader } from "../../interfaces/atoms"
import { useTab } from "./hook"

import './index.scss'

export const TabsHeader = ({children, handleOnChange, onPressEnter, id, activeId} : iTabsHeader) => {
    const handleKeyUp = ({ keyCode, target }) => {
        if (keyCode === 13) { // ENTER KEY
            const input = target.previousElementSibling
            onPressEnter(input)
        }
    }

    return (
    <header className="tabs__header">
        { React.Children.map(children, ({ props }, index) => {
            return (<>
                <input 
                    onChange={handleOnChange} 
                    name={ `tab-group-${id}` } 
                    type="radio"  
                    id={`tab-${index}`} 
                    role="button"
                    checked={activeId === `tab-${index}`}
                />
                <label onKeyUp={handleKeyUp} tabIndex={index} 
                    aria-selected={activeId === `tab-${index}`}
                    aria-controls={`tab-${index}`}
                    className={classNames("tabs__header-item", props?.theme,
                    { 
                        "has-arrow": props?.hasArrow,
                    })} 
                    htmlFor={`tab-${index}`}
                >
                    { props?.icon } { props?.title }
                </label>
            </>)
        })}
    </header>
)}

export const Tabs = ({ children, title } ) => {
    const {  randId, tabsContentRef, maxHeight, activeId, onChange, onChangeContent, onPressEnter } = useTab()

    return <section className="tabs">
        <TabsHeader activeId={activeId} id={randId} handleOnChange={onChange} onPressEnter={onPressEnter}>{children}</TabsHeader>
        
        <main 
            onChange={onChangeContent} 
            style={{minHeight: maxHeight}} 
            className="tabs__content" 
            ref={tabsContentRef}
            role="tablist"
            aria-label={title || "List of Tabs"}
        >
            { React.Children.map(children, (child, index) => {
                return (React.cloneElement(child, {
                    index,
                    activeId
                }))
            })}
        </main>
    </section>
}

export const TabItem = ({ children, index, activeId } : iTab) => {
    const itemId = `tab-${index}`
    return (
        <div 
            role="presentation" 
            aria-labelledby={itemId}
            tabIndex={index}
            className={classNames("tab__item", { "is-active": activeId ===  itemId})} 
        >
            { children }
        </div>
)}
  