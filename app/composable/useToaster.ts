export const useNotifier = () => {
  const toast = useToast()

  const toastTypes = {
    success: { title: "Успех", color: "success" as const },
    warning: { title: "Внимание", color: "warning" as const },
    error: { title: "Ошибка", color: "error" as const },
    info: { title: "Информация", color: "neutral" as const },
  }

  const showToast = (type: keyof typeof toastTypes, message: string, duration = 3000) => {
    const config = toastTypes[type]
    toast.add({
      title: config.title,
      description: message,
      color: config.color,
      duration,
    })
  }

  return {
    showToast,
    success: (msg: string, duration?: number) => showToast("success", msg, duration),
    warning: (msg: string, duration?: number) => showToast("warning", msg, duration),
    error: (msg: string, duration?: number) => showToast("error", msg, duration),
    info: (msg: string, duration?: number) => showToast("info", msg, duration),
  }
}
