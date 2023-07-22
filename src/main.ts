import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
  const fullList = FullList.instance
  const templates = ListTemplate.instance

  const form = document.getElementById('itemEntryForm') as HTMLFormElement
  form.addEventListener('submit', (event: SubmitEvent): void => {
    event.preventDefault();
    const newItemInput = document.getElementById('newItem') as HTMLInputElement
    const newItemData = newItemInput.value.trim()
    if (!newItemData) return
    const itemId = fullList.list.length
    ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
    : 1
    const newItem = new ListItem(itemId.toString(), newItemData,)
    fullList.addItem(newItem)
    templates.render(fullList)
    newItemInput.value = ''
  })

  const clearBtn = document.getElementById('clearItemsButton') as HTMLButtonElement
  clearBtn.addEventListener('click', (): void => {
    fullList.clearList()
    templates.clear()
  })

  fullList.load()
  templates.render(fullList)
}

document.addEventListener('DOMContentLoaded', initApp)