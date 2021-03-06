<template>
    <section id="main">
        <nuxt-link to="/panel" id="back">
            <div class="flexbox align-center" style="margin-bottom: 20px; background: #fefefe; max-width: 200px; width: 100%; padding-left: 10px; padding-right: 10px;">
                <fa icon="arrow-alt-circle-left" style="font-size: 2em; color: #5352ed; margin-right: 20px;" /> <p style="color: #5352ed">Torna alla home</p>
            </div>
        </nuxt-link>
        <h1 style="margin: 0;"> Carica qualcosa </h1>
            <p> 
                Puoi caricare un massimo di <b> 20 </b> file alla volta con dimensione massima dell'upload di <b>20MB</b>.<br>
                I tipi di file supportati sono: <b> .txt</b>, <b> .pdf</b>,<b> .doc</b>,<b> .docx</b>,<b> .odt</b>,<b> .jpeg</b>,<b> .jpg</b>,<b> .png </b>,<b> .zip</b>,<b> .7z</b>,<b> .gzip</b>,<b> .xz</b>, <b> .bzip2</b>.
                <br>
                I file non supportati non verranno visualizzati all'interno della lista file da caricare.
            </p>
            <form style="width: 80%;" @submit.prevent="upload" id="former">
                <input type="text" class="fancy full-width" placeholder="Titolo" v-model="title">
                <SimulatedSelect class-name="full-width" ref="select_subject" right-icon="chevron-down" placeholder="Seleziona materia" data-id="select1" :items="getSubjects" />
                <div class="flexbox align-top justify-between">
                    <div style="width: 30%">
                        <div class="flexbox" style="width: 100%; margin-right: 20px;">
                            <button class="fancy" style="margin-right: 5px;"><span>Upload!</span></button>
                            <button class="fancy" @click.prevent="clickFiles" style="margin-right: 5px;"><span>Seleziona file</span></button>
                        </div>
                        <div v-if="uploading" class="progress-bar">
                            <span>{{ progress.toFixed(1) }}% ({{ loaded }}/{{ total }} MB)</span>
                            <div class="bar" :style="{'width': `${progress}%`}"></div>
                        </div>
                        <p>
                            {{ message }}
                        </p>
                    </div>
                        <input type="file" hidden multiple id="files" @change="loadFiles">
                    </div>
                    <ul class="fancy-list" style="flex: 1; margin-top: -5px;" v-if="files.length">
                        <li v-for="(file, i) in files" :key="i"> 
                            <div class="flexbox justify-between align-center">
                                <span style="width: 75%;"> {{ file.name }} </span>
                                <div class="icon"><fa icon="trash" @click="remove(i)" /></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </form>
    </section>
</template>
<style lang="scss" scoped>
    #former{
        width: 100% !important;
    }
</style>
<script lang="ts">

import Vue from 'vue'
import { methods } from '@/lib/api';
 
export default Vue.extend({
    layout: 'panel',
    data(){
        return {
            title: '',
            message: '',
            files: [] as File[],
            progress: 0,
            loaded: 0,
            total: 0,
            uploading: false,
            mimetypes: [
                "text/plain",
                "application/pdf",
                "application/msword", // doc
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
                "application/vnd.oasis.opendocument.text", // odt
                "image/jpeg",
                "image/png",
                "application/zip",
                "application/x-7z-compressed",
                "application/gzip",
                "application/x-xz",
                "application/x-bzip2"
            ]
        }
    },
    methods: {
        remove(index: number){
            this.files.splice(index, 1);
        },
        async upload(){
    
            if(!this.title || !(this.$refs as any).select_subject.selected_value)
                return this.$data.message = 'Tutti i campi sono obbligatori'
            
            if(!this.files.length)
                return this.$data.message = 'Devi caricare almeno un file'

            let form = new FormData();
            
            form.append('subject_id', (this.$refs as any).select_subject.selected_value);
            form.append('title', this.title);
            this.files.forEach((file: File) => form.append('notes', file));

            this.uploading = true;

            try{
                await (this as any).$api.client.post('/notes', form, {
                    onUploadProgress: (progressEvent: any) => {
                        let percentage = (progressEvent.loaded / progressEvent.total) * 100;

                        this.total = parseFloat((progressEvent.total / 1000000).toFixed(2));
                        this.loaded = parseFloat((progressEvent.loaded / 1000000).toFixed(2));
                        this.updateProgress(percentage);
                    }
                })
                this.message = 'Appunti caricati con successo! Grazie!'
            }catch(err){
                console.log(err);
                this.message = 'Errore generico durante l\'upload'
            }finally{
                this.uploading = false;
            }

        },
        clickFiles(){
            document.getElementById('files')!.click();
        },
        updateProgress(progress: number){

            this.progress = progress;

        },
        loadFiles(event: Event){

            let target = event.target as HTMLInputElement;
            
            Array.prototype.forEach.call(target.files!, (file: File) => {

                console.log(file.type);
                
                if(this.$data.mimetypes.includes(file.type))
                    this.$data.files.push(file);

            })

        },
        async getSubjects(){
            
            try{

                return await methods.subjects.getSubjects()

            }catch(err){

                console.log(err);
                throw err;

            }
            
        }
    }
})

</script>