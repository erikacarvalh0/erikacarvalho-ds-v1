import React from "react"
import classNames from "classnames"

import { iPagination } from "../../interfaces/atoms"
import { Button } from "../Button"

import { usePagination } from "./hook"
import './index.scss'

export const Pagination = ({ config, allItems, visibleItemsState } : iPagination) => {
    const { arrows, dots } = config 
    const { 
        activePage,
        pagesNums,
        hasPrevious,
        hasNext,
        handleNext,
        handlePrevious,
        handlePageItems 
    } = usePagination({ config, allItems, visibleItemsState })

    if (allItems.length <= config.itemsPerPage) return null

    return (
        <section className="pagination">
            <Button
                customClass={classNames('pagination__previous', {'is-arrow': arrows})}
                isDisabled={!hasPrevious}
                action={handlePrevious}
            >
                { !arrows ? 'Anterior' : ''}
            </Button>
            { !!config.maxPagesNums && pagesNums.map((num) => 
                <Button
                    customClass={classNames('pagination__page', {
                        'active': activePage === num, 
                        'is-dot': dots
                    })}
                    action={() => handlePageItems(num)}
                    key={num}
                >
                    { !dots ? num : '' }
                </Button>
            )}
            <Button
                customClass={classNames('pagination__next', {'is-arrow': arrows})}
                isDisabled={!hasNext}
                action={handleNext}
            >
                { !arrows ? 'Próximo' : '' }
            </Button>
        </section>
    )
}