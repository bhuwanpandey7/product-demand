class Debouncer {

    static debounce = (func: Function) => {
        let timer: any;
        return (...args: any) => {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };
}

export default Debouncer;