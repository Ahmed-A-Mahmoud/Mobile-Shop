export class User {
    constructor(
        public Firstname: string,
        public Lastname: string,
        public Address: string,
        public Phone: string,
        public Email: string,
        public Wallet: number,
        public Purchases: []) { }
}