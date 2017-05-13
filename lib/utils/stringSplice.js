function stringSplice(str, content, start, end) {
    return str.slice(0, start) + content + str.slice(end)
}

export default stringSplice
