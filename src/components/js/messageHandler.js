import { ElMessage } from "element-plus";


export function handleMessageSuccess(msg){
    ElMessage({
        message: msg,
        type: "success"
    })
}

export function handleMessageError(msg){
    ElMessage({
        message: msg,
        type: "error"
    })
}

export function handleMessageInfo(msg){
    ElMessage({
        message: msg,
        type: "info"
    })
}




