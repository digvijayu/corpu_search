//---------------------------------------------------------------
function libGetIndexOfWord(p_Array, p_Word)
{
    var LResult = -1; //Index of the word in the array
    for(var LLoopIndex=0; LLoopIndex < p_Array.length; LLoopIndex++)
    {
        var ArrayEl = p_Array[LLoopIndex];
        if(ArrayEl == p_Word)
        {
            //Keyword found return the index of that key word
            LResult = LLoopIndex;
            return LResult;
        }
    }

    //The word was no found in the array
    return LResult;
}

//---------------------------------------------------------------
function getDocumentAssociationMatrixData(fn)
{
    if(! G_DATA_JSON.DOC_ASSOC_MATRIX)
    {
        //The data is not loaded load the function
        d3.csv("data/docAssocMatrix_SIMILARITY.csv", function(p_data) {
            G_DATA_JSON.DOC_ASSOC_MATRIX = p_data;
            fn(G_DATA_JSON.DOC_ASSOC_MATRIX);
        });
    }
    else{
        fn(G_DATA_JSON.DOC_ASSOC_MATRIX);
    }
}

//---------------------------------------------------------------
function isDocTypeSelected(p_docTypeCode)
{
    for(var LLoopIndex = 0; LLoopIndex < G_DOCUMENT_TYPE.length; LLoopIndex++)
    {
        var LItem = G_DOCUMENT_TYPE[LLoopIndex];
        if(LItem.typeCode == p_docTypeCode && LItem.isSelected === true)
        {
            return true;
        }
    }
    return false;
}

//---------------------------------------------------------------
function getDocumentTypeTitle(p_docTypeCode)
{
    for(var LLoopIndex = 0; LLoopIndex < G_DOCUMENT_TYPE.length; LLoopIndex++)
    {
        var LItem = G_DOCUMENT_TYPE[LLoopIndex];
        if(LItem.typeCode == p_docTypeCode && LItem.isSelected === true)
        {
            return LItem.typeName;
        }
    }
}

//---------------------------------------------------------------

//---------------------------------------------------------------
function getDissimilarityAssocBetwnDoc(p_doc1, p_doc2)
{
    G_DATA_JSON.DOC_ASSOC_MATRIX;
    //Get document index for both the items
    var LDocData = G_DATA_JSON.DOC_DATA,
        Ldoc1Index = -1,
        Ldoc2Index = -1;
    for(var LLoopIndex = 0; LLoopIndex < LDocData.length; LLoopIndex++)
    {
        var LObj = LDocData[LLoopIndex];
        if(LObj.Filename == p_doc1)
        {
            //index for first doc
            Ldoc1Index = LObj.index;
        }

        if(LObj.Filename == p_doc2)
        {
            //Index for second doc
            Ldoc2Index = LObj.index;
        }
        if((Ldoc1Index > -1) && (Ldoc2Index > -1))
        {
            //both indexes are found
            break;
        }
    }


    var LRowNo = Ldoc1Index,
        LColNo = Ldoc2Index,
        LSimillarityAssoc;

    if(Ldoc1Index < Ldoc2Index)
    {
        LRowNo = Ldoc2Index;
        LColNo = Ldoc1Index;
    }

    LRowNo = LRowNo - 2;
    LSimillarityAssoc = G_DATA_JSON.DOC_ASSOC_MATRIX[LRowNo][LColNo];
    return (1 - LSimillarityAssoc);
}

//---------------------------------------------------------------