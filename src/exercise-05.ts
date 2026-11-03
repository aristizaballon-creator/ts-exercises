function Timed(
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
): PropertyDescriptor {

    const original: (...args: unknown[]) => unknown = descriptor.value;

    descriptor.value = function (this: unknown, ...args: unknown[]) {
        const start = performance.now();
        const result = original.apply(this, args);
        const end = performance.now();
        console.log(`${String(propertyKey)} took ${end - start} ms`);

        return result;
    };

    return descriptor;
}

function Retry(times: number) {
    return function (
        target: object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor {
        const original: (...args: unknown[]) => unknown = descriptor.value;

        descriptor.value = function (this: unknown, ...args: unknown[]) {
            let lastError: unknown;

            for (let attempt = 1; attempt <= times; attempt++) {
                try {
                    return original.apply(this, args);
                } catch (error){
                    lastError = error;
                }
            }
            throw lastError;
            
        };

        return descriptor;
    };
}

class Service {
    private attempts = 0;

    @Timed
    @Retry(3)
    fetchData(): string {
        this.attempts++;
        if (this.attempts <3) {
            throw new Error(`Failed attempt ${this.attempts}`);
        }
        return "data";
    }
}

const service = new Service();
console.log(service.fetchData());



