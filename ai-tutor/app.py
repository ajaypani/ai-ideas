from dotenv import load_dotenv
from langchain.embeddings import OpenAIEmbeddings
from langchain.document_loaders import DirectoryLoader, TextLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA
from langchain import OpenAI

load_dotenv()
embeddings = OpenAIEmbeddings()

loader = DirectoryLoader("./data/", glob="**/*.txt")
documents = loader.load()
print (len(documents))

textsplitter = CharacterTextSplitter(chunk_size=2500,chunk_overlap=0)
texts = textsplitter.split_documents(documents)

vecstore = Chroma.from_documents(texts, embeddings)

qa = RetrievalQA.from_chain_type(
    llm=OpenAI(),
    chain_type="stuff",
    retriever=vecstore.as_retriever()
)

def query(query):
    print ("query:", query)
    print ("Answer:", qa.run(query))
    
  
input = input() 
query(input)

