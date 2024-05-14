import React from "react"
import classNames from "classnames"

import { iTab, iTabsHeader } from "../../interfaces/atoms"
import { useTab } from "./hook"

import './index.scss'

export const TabsHeader = ({children, handleOnChange, id} : iTabsHeader) => (
    <header className="tabs__header">
        { React.Children.map(children, ({ props }, index) => {
            return (<>
                <input 
                    onChange={handleOnChange} 
                    name={ `tab-group-${id}` } 
                    type="radio"  
                    id={`tab-${index}`} 
                    role="button"
                />
                <label 
                    className={classNames("tabs__header-item", props?.theme,
                    { 
                        "has-arrow": props?.hasArrow
                    })} 
                    htmlFor={`tab-${index}`}
                >
                    { props?.icon } { props?.title }
                </label>
            </>)
        })}
    </header>
)

export const Tabs = ({ children } ) => {
    const {  randId, tabsContentRef, maxHeight, activeId, onChange, onChangeContent } = useTab()

    return <section className="tabs">
        <TabsHeader id={randId} handleOnChange={onChange}>{children} </TabsHeader>
        
        <main 
            onChange={onChangeContent} 
            style={{minHeight: maxHeight}} 
            className="tabs__content" 
            ref={tabsContentRef}
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
        <div className={classNames("tab__item", { "is-active": activeId ===  itemId})} >
            { children }
        </div>
)}
  