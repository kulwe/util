/**
 * Created by kule on 2017/7/10.
 */
export const injectScript=(src)=>{
    const script = document.createElement('script');
    script.type='text/javascript';
    script.async = true;
    script.src = ('https:' == location.protocol ? 'https://' : 'http://') +src;
    document.body.appendChild(script);
};

export default injectScript;