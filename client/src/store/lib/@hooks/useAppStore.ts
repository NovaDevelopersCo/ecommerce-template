import { useStore } from 'react-redux'

import { AppStore } from '@store/index'

const useAppStore: () => AppStore = useStore

export default useAppStore
