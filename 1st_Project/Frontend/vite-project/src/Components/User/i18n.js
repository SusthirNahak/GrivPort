
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


const resources = {
  en: {
    translation: {
      Fill_The_Grievance_Form: 'Fill The Grievance Form',
      description: 'This is an English description.',
      file_a_grievance: 'File a Grievance',
      learn_more: 'Learn More',
      mission_visoin_title: 'Our Mission & Vision',
      mission_visoin_subtitle_1: 'His strong direction and loving spirit of service',
      mission_visoin_sparagraph_1: 'He has dedicated his life to improving the roads and traffic management system in Odisha. New railway projects, fast roads, and safe transportation are his priorities.',
      mission_visoin_subtitle_2: 'Trade and investment, new opportunities for Odisha',
      mission_visoin_sparagraph_2: 'He is working towards making Odisha a national business hub and giving global recognition to handicrafts and local producers.',
      mission_visoin_subtitle_3: 'Public service is his religion.',
      mission_visoin_sparagraph_3: 'People in trouble can reach him easily. With this belief in mind, he has started a "Janasamsyapriv Manch" where people can file their grievances and get quick resolution.',
      grievance_send_title: `Odisha's pride, a journey to fulfill the dreams of the people`,
      grievance_send_paragraph: 'Bibhuti Bhushan Jena believes that public service is the highest religion. He has dedicated his labor, time and love for this land, this people and this culture. Under his leadership, Odisha is now moving towards glory and pride.',
      minister_name: 'Bibhuti Bhushan Jena',
      what_is_he: 'Voice of the land, leader of the people, pride of Odisha.',
      what_is_he_2: 'Not a leader. A servant. Not an officer. A hope. Not a representative. A family of the people.',
      about_him_para_1: 'Bibhuti Bhushan Jena, the representative of Gopalpur assembly constituency in the Odisha Assembly and the Minister for Commerce and Transport in the Government of Odisha, is an MLA who understands the land, understands the people and takes their suffering as his duty.',
      about_him_para_2: 'Starting from the land of Gopalpur, he has now made a strong contribution to the development journey of Odisha. Under his leadership and inspiration, Ganjam and Odisha are growing in a new direction today. This direction is the future of Odisha that is being shaped with new hopes, new approaches and people-oriented policies.',
    }
  },
  od: {
    translation: {
      Fill_The_Grievance_Form: 'ଅଭିଯୋଗ ଫର୍ମ ପୂରଣ କରନ୍ତୁ',
      description: 'ଏହା ଏକ ଓଡ଼ିଆ ବିବରଣୀ ଅଟେ।',
      file_a_grievance: 'ଆପଣଙ୍କ ଅଭିଯୋଗ ଆମ ପାଖରେ ପଠାନ୍ତୁ',
      learn_more: 'ଅଧିକ ଜାଣନ୍ତୁ',
      mission_visoin_title: 'ତାଙ୍କର ଦୃଢ଼ ଦିଗନିର୍ଦ୍ଦେଶ ଓ ପ୍ରେମପୂର୍ଣ୍ଣ ସେବା ଭାବନା',
      mission_visoin_subtitle_1: 'ପରିବହନ ବିଭାଗରେ ନୂଆ ଯୁଗ',
      mission_visoin_sparagraph_1: 'ଓଡ଼ିଶାର ରାସ୍ତା ଓ ଯାନଚାଳନ ବ୍ୟବସ୍ଥାକୁ ଏକ ସୁଠାମ ରୂପ ଦେବା ପାଇଁ ସେ ନିଜ ଜୀବନକୁ ସମର୍ପିତ କରିଛନ୍ତି। ନୂଆ ରେଳ ପ୍ରକଳ୍ପ, ଦ୍ରୁତ ରାସ୍ତା ଓ ସୁରକ୍ଷିତ ଯାତାୟାତ ତାଙ୍କର ପ୍ରାଥମିକତା।',
      mission_visoin_subtitle_2: 'ବାଣିଜ୍ୟ ଓ ନିବେଶ, ଓଡ଼ିଶା ପାଇଁ ନୂଆ ଅବସର',
      mission_visoin_sparagraph_2: 'ଓଡ଼ିଶାକୁ ଏକ ଜାତୀୟ ବ୍ୟବସାୟ କେନ୍ଦ୍ର ବାଣାଇବା, ହସ୍ତଶିଳ୍ପ ଓ ସ୍ଥାନୀୟ ଉତ୍ପାଦକଙ୍କୁ ବିଶ୍ୱ ମାନ୍ୟତା ଦେବା ପାଇଁ ସେ ଲକ୍ଷ୍ୟନିଷ୍ଠ ଭାବେ କାର୍ଯ୍ୟ କରୁଛନ୍ତି।',
      mission_visoin_subtitle_3: 'ଜନସେବା ହେଉଛି ତାଙ୍କର ଧର୍ମ',
      mission_visoin_sparagraph_3: 'ଅସୁବିଧାରେ ଥିବା ଜନତା ତାଙ୍କ ପାଖରେ ସରଳତାରେ ପହଞ୍ଚିପାରିବେ। ଏହି ବିଶ୍ୱାସକୁ ନିଜ ଓଦ୍ଦେଶ୍ୟ ବାଣି ତାଙ୍କ ତରଫରୁ ଆରମ୍ଭ କରାଯାଇଛି "ଜନସମସ୍ୟା ନିବାରଣ ମଞ୍ଚ" ଯେଉଁଠି ଲୋକମାନେ ନିଜ ଅଭିଯୋଗ ଦାଖଲ କରିପାରିବେ ଓ ମିଳିପାରିବେ ଦ୍ରୁତ ସମାଧାନ।',
      grievance_send_title: 'ଓଡ଼ିଶାର ସ୍ବାଭିମାନ, ଜନତାର ସ୍ବପ୍ନ ପୂରଣର ଯାତ୍ରା',
      grievance_send_paragraph: 'ବିଭୂତି ଭୂଷଣ ଜେନା ବିଶ୍ୱାସ କରନ୍ତି ଯେ ଜନସେବା ହେଉଛି ସର୍ବୋଚ୍ଚ ଧର୍ମ। ସେ ଏହି ମାଟି, ଏହି ମଣିଷ ଓ ଏହି ସଂସ୍କୃତି ପାଇଁ ତାଙ୍କର ଶ୍ରମ, ସମୟ ଓ ସ୍ନେହକୁ ସମର୍ପିତ କରିଛନ୍ତି। ତାଙ୍କ ନେତୃତ୍ୱରେ ଓଡ଼ିଶା ଏବେ ଗୌରବ ଓ ଗର୍ବର ଦିଗରେ ବଢ଼ୁଛି।',
      minister_name: 'ବିଭୂତି ଭୂଷଣ ଜେନା',
      what_is_he: 'ମାଟିର ସ୍ୱର, ଜନତାର ନେତା, ଓଡ଼ିଶାର ଗର୍ବ।',
      what_is_he_2: 'ଜଣେ ନେତା ନୁହଁନ୍ତି। ଜଣେ ସେବକ। ଜଣେ ଅଧିକାରୀ ନୁହଁନ୍ତି। ଜଣେ ଆଶା। ଜଣେ ପ୍ରତିନିଧି ନୁହଁନ୍ତି। ଜଣେ ଜନତାର ପରିବାର।',
      about_him_para_1: `ବିଭୂତି ଭୂଷଣ ଜେନା, ଓଡ଼ିଶା ବିଧାନସଭାରେ ଗୋପାଳପୁର ବିଧାନସଭା କ୍ଷେତ୍ରର ପ୍ରତିନିଧି ଏବଂ ଓଡ଼ିଶା ସରକାରର ବାଣିଜ୍ୟ ଓ ପରିବହନ ବିଭାଗର ମନ୍ତ୍ରୀ, ଜଣେ ଏମନ୍ତି ନେତା ଯିଏ ମାଟିକୁ ବୁଝନ୍ତି, ମଣିଷକୁ ବୁଝନ୍ତି ଏବଂ ତାଙ୍କ ଦୁଃଖକୁ ନିଜର କର୍ତ୍ତବ୍ୟ ଭାବେ ଗ୍ରହଣ କରନ୍ତି।`,
      about_him_para_2: `ଗୋପାଳପୁରର ମାଟିରୁ ଆରମ୍ଭ କରି ଏବେ ସେ ଓଡ଼ିଶାର ବିକାଶ ଯାତ୍ରାରେ ଏକ ଦୃଢ଼ ଅବଦାନ ରଖିଛନ୍ତି। ତାଙ୍କର ନେତୃତ୍ୱ ଓ ପ୍ରେରଣା ରେ ଗଞ୍ଜାମ ଏବଂ ଓଡ଼ିଶା ଆଜି ନୂଆ ଦିଗରେ ବଢ଼ିଚାଲିଛି। ଏହି ଦିଗ ହେଉଛି ନୂଆ ଆଶା, ନୂଆ ଅଭିଗମ ଓ ଜନମୁଖୀ ନୀତି ସହିତ ଗଢ଼ିଉଠିଥିବା ଓଡ଼ିଶାର ଭବିଷ୍ୟତ।`,
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'od',
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
