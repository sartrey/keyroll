namespace Keyroll
{
    partial class KVMDomainUI
    {
        /// <summary> 
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region 组件设计器生成的代码

        /// <summary> 
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            this.TxtName = new Sartrey.UI.WinForms.InputTextUI();
            this.BtnUpdate = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // TxtName
            // 
            this.TxtName.BackColor = System.Drawing.Color.Transparent;
            this.TxtName.Dock = System.Windows.Forms.DockStyle.Top;
            this.TxtName.InputText = "";
            this.TxtName.LabelText = "Name";
            this.TxtName.LabelWidth = 0;
            this.TxtName.Location = new System.Drawing.Point(10, 10);
            this.TxtName.Name = "TxtName";
            this.TxtName.OldText = "";
            this.TxtName.Padding = new System.Windows.Forms.Padding(1);
            this.TxtName.PasswordText = '\0';
            this.TxtName.Size = new System.Drawing.Size(280, 25);
            this.TxtName.TabIndex = 0;
            // 
            // BtnUpdate
            // 
            this.BtnUpdate.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.BtnUpdate.Location = new System.Drawing.Point(10, 360);
            this.BtnUpdate.Name = "BtnUpdate";
            this.BtnUpdate.Size = new System.Drawing.Size(280, 30);
            this.BtnUpdate.TabIndex = 1;
            this.BtnUpdate.Text = "Update";
            this.BtnUpdate.UseVisualStyleBackColor = true;
            this.BtnUpdate.Click += new System.EventHandler(this.BtnUpdate_Click);
            // 
            // KVMDomainUI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.BtnUpdate);
            this.Controls.Add(this.TxtName);
            this.Name = "KVMDomainUI";
            this.Padding = new System.Windows.Forms.Padding(10);
            this.Size = new System.Drawing.Size(300, 400);
            this.ResumeLayout(false);

        }

        #endregion

        private Sartrey.UI.WinForms.InputTextUI TxtName;
        private System.Windows.Forms.Button BtnUpdate;
    }
}
