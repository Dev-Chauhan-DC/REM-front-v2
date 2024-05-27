import ImageCompressor from 'react-native-compressor';
import RNFS from 'react-native-fs';


export const imageCompress = async (absolutePath) => {

    try {
        const result = await ImageCompressor.Image.compress(absolutePath, {
            compressionMethod: 'auto',
        });

        const response = await RNFS.readFile(result, 'base64');
        return response
    } catch (error) {
        console.error('Error converting image to base64:', error);
    }


}
