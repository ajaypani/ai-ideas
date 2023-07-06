import streamlit as st
from PyPDF2 import PdfReader
from streamlit_extras.add_vertical_space import add_vertical_space
from langchain.text_splitter import text_splitter

#side bar
with st.sidebar:
    st.sidebar.title('🤗💬 PDF Query App')
    st.markdown('''
    ## About
    This app is an LLM-powered chatbot built using:
    - [Streamlit](https://streamlit.io/)
    - [LangChain](https://python.langchain.com/)
    - [OpenAI](https://platform.openai.com/docs/models) LLM model
    ''')

def main():
    st.header('Pdface')

    pdf = st.file_uploader('Upload a PDF', type=['pdf'])

    if pdf is not None: 
        pdf_reader = PdfReader(pdf)
        text = " "
        for i in range(pdf_reader.numPages):
            page = pdf_reader.getPage(i)
            text += page.extractText()
        text_splitter = RecursiveCharSplitter(
            chunk_size=1000,
            chunk_overlap=100,
            length_function=len
        )
        chunks = text_splitter.split(text=text)
    

if __name__ == '__main__':
    main()