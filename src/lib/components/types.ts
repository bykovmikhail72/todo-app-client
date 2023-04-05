export interface IModalProps {
  id?: number
  updateTitle?: string
  updateDescription?: string
  updateFinishDate?: string
  updateStatus?: string
  updatePriority?: string
  updateWorker?: string
  className?: string
  onClick?: () => void
}
