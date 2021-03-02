import { methods } from '@/lib/api';

export default function infiniteScrollComponent(url){

    return {
        data: () => {
            return {
                loadedPages: [1],
                load: true
            };
        },
        beforeMount() {
            window.addEventListener('scroll', this.onscroll);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.onscroll);
        },
        methods: {
            // roba infinite scroll
            addNotePages(page) {
                console.log(`loading page ${page}`);
                console.log(this.$data.notes);
                methods.notes.get(url, 1, false).then((data) => {
                    this.$data.notes = this.$data.notes.concat(data);
                });
            },
            onscroll() {
                // chiamato per ogni scroll, debouncing scorrimento
                if (this.$data.load) {

                    this.$data.load = false;
                    setTimeout(() => { this.$data.load = true }, 500);
                    setTimeout(this.onScroll, 200);
                    
                }
            },
            onScroll() {
                // funzione che fa funzionare l'infinite scroll vero e proprio
                if (this.$data.loadedPages[this.$data.loadedPages.length - 1] < this.$data.notePages) {
                    console.log("fired onscroll");
                    let totalPageHeight = document.body.scrollHeight;
                    let scrollPoint = window.scrollY + window.innerHeight;
                    if (scrollPoint >= totalPageHeight - 200) {
                        let pageToBeLoaded = this.$data.loadedPages[this.$data.loadedPages.length - 1] + 1;
                        this.$data.loadedPages.push(pageToBeLoaded);
                        this.addNotePages(pageToBeLoaded);
                    }
                }
            }
        }
    }
}