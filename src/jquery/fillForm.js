import inArray from '../inArray';
const fillForm=(data)=>{
    $('input',jqForm).each(function(index){
        const {type,name,value}=this;
        if(!(name in data)){
            return;
        }
        const newValue=data[name];
        let newValues=[];
        if(type=='checkbox'){
            newValues=newValue?newValue.split(','):[];
            this.checked=inArray(value,newValues);
            return;
        }
        $(this).val(newValue);
    })
};
export default fillForm;