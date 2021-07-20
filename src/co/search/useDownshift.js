import { useCallback } from 'react'
import { useCombobox } from 'downshift'

const itemToString = item => item && item.query

export default function useDownshift({ filter, applyFilter, suggestions }) {
    const haveItems = (suggestions.length ? true : false)

    const stateReducer = useCallback((state, { type, changes }) => {
        const incompleteToken = (changes.inputValue||'').endsWith('#') || (changes.inputValue||'').endsWith(':')
    
        switch (type) {
            case useCombobox.stateChangeTypes.InputChange:
                return {
                    ...changes,
                    isOpen: changes.inputValue && haveItems,
                    highlightedIndex: 0
                }
    
            //select item
            case useCombobox.stateChangeTypes.InputKeyDownEnter:
            case useCombobox.stateChangeTypes.ItemClick:
                //local option click, prevent autoclose
                if (changes.selectedItem &&
                    changes.selectedItem.query.startsWith('local:'))
                    return {
                        ...state,
                        selectedItem: changes.selectedItem
                    }

                return {
                    ...changes,
                    isOpen: changes.inputValue && incompleteToken,
                    highlightedIndex: incompleteToken ? 0 : state.highlightedIndex,
                    inputValue: '',
                }
    
            default:
                return changes
        }
    }, [haveItems])

    const onStateChange = useCallback(({type, selectedItem})=>{
        switch(type) {
            //select item
            case useCombobox.stateChangeTypes.InputKeyDownEnter:
            case useCombobox.stateChangeTypes.ItemClick:{
                if (!selectedItem) return

                //usual token
                const token = itemToString(selectedItem)
                if (token)
                    applyFilter(token)

                break
            }
        }
    })

    return useCombobox({
        items: suggestions,
        itemToString,
        inputValue: filter,
        selectedItem: null,
        stateReducer,
        onStateChange
    })
}