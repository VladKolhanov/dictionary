import { BiError } from 'react-icons/bi'
import { GiCheckMark } from 'react-icons/gi'
import { Alert } from '../../../ui/Alert'

export const AlertAddWord = ({ ok, error, ...props }) => (
   <>
      {error && (
         <Alert error>
            <BiError />
            <p>This action failed. Please try again.</p>
         </Alert>
      )}

      {ok && (
         <Alert>
            <GiCheckMark />
            <p>The word was successfully added to the dictionary</p>
         </Alert>
      )}
   </>
)
