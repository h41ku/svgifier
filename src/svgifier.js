const getUrl = node => node.dataset.src
const getHeaders = node => undefined
const getClassName = () => 'svgify'

const cache = { }

const retrieveNode = async (url, headers) => {
    const response = await fetch(url, {
        headers
    })
    const buffer = document.createElement('div')
    if (response.ok && response.status === 200) {
        buffer.innerHTML = await response.text()
        const svg = buffer.querySelector('svg')
        return svg
    }
    return null
}

const svgifyNode = async (node, options = { }) => {
    try {
        const url = (options.getUrl || getUrl)(node)
        if (!(url in cache)) {
            cache[url] = retrieveNode(url, (options.getHeaders || getHeaders)(node)) // returns Promise
        }
        const svg = await cache[url]
        if (svg) {
            const clone = svg.cloneNode(true)
            const specialClassName = (options.getClassName || getClassName)()
            clone.classList.add(... [... node.classList].filter(className => className !== specialClassName))
            node.replaceWith(clone)
        }
    } catch (error) {
        console.error(error)
    }
}

const svgify = async (node = null, options = { }) => {
    const specialClassName = (options.getClassName || getClassName)()
    const selector = `.${specialClassName}`
    let targets = []
    if (node instanceof Element) {
        if (node.tagName !== 'svg') {
            if (node.classList.contains(specialClassName)) {
                targets = [ node ]
            } else {
                targets = [ ...node.querySelectorAll(selector) ]
            }
        }
    } else if (node === null) {
        targets = [ ...document.querySelectorAll(selector) ]
    }
    await Promise.all(targets.map(target => svgifyNode(target, options)))
}

const observe = (node = null, options = { }) => {
    const observer = new MutationObserver(mutationsList => {
        for (let mutation of mutationsList) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(target => {
                    if (target instanceof Element) {
                        svgify(target, options)
                    }
                })
            }
        }
    })
    observer.observe(node === null ? document.body : node, {
        childList: true,
        subtree: true
    })
    return observer
}

export default {
    svgify,
    observe
}
