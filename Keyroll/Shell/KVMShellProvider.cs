using Keyroll.KVM;
using System.IO;

namespace Keyroll.Shell
{
    public class KVMShellProvider : IShellProvider
    {
        public bool Support(string mime)
        {
            if (mime == KVM.Memory.MIME)
                return true;
            return false;
        }

        public object Shell(Stream stream)
        {
            var memory = Memory.Load(stream);
            return memory;
        }
    }
}
