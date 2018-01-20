import inArray from '../inArray';
export const fillForm=(jqForm,data)=>{
    $('input',jqForm).each(function(index){
        const {type,name,value}=this;
        if(!(name in data)){
            return;
        }
        const newValue=data[name];
        let newValues=[];
        if(type=='checkbox'){
            newValues=newValue?newValue.split(','):[];
            this.checked=inArray(newValues,value);
            return;
        }
        $(this).val(newValue);
    })
};
export default fillForm;